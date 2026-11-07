import { useId, type CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'
import type { DiagramEdge, DiagramNode } from '@/content/projects'
import { cn } from '@/lib/utils'

const W = 170 // node width in diagram units
const H = 64 // node height
const VIEW = { w: 1000, h: 560 }

type Props = {
    nodes: DiagramNode[]
    edges: DiagramEdge[]
    /** Draw-in plays each time this becomes true. */
    active: boolean
    title: string
    className?: string
}

/**
 * System architecture rendered from data. Nodes fade up and edges draw themselves in
 * (CSS transitions keyed off `data-active`, see .diagram in globals.css), then a dot
 * runs along each edge to show which way data flows. Static under reduced motion.
 */
export default function ArchitectureDiagram({ nodes, edges, active, title, className }: Props) {
    const reduce = useReducedMotion()
    const markerId = `arrow-${useId().replace(/:/g, '')}`
    const byId = new Map(nodes.map((node) => [node.id, node]))
    const flowing = active && !reduce

    return (
        <div className={cn('overflow-x-auto overscroll-x-contain', className)}>
            <svg
                viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
                className="diagram h-auto w-full min-w-[720px] font-mono"
                data-active={active || undefined}
                role="img"
                aria-label={`${title} architecture: ${describe(nodes, edges, byId)}`}
            >
                <defs>
                    <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M0,0 L8,4 L0,8" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
                    </marker>
                </defs>

                {edges.map((edge, index) => {
                    const from = byId.get(edge.from)
                    const to = byId.get(edge.to)
                    if (!from || !to) return null
                    const { d, labelAt } = route(from, to)
                    const delay = 0.25 + index * 0.12
                    return (
                        <g key={`${edge.from}-${edge.to}`} style={{ '--d': `${delay}s` } as CSSProperties}>
                            <path
                                className="diagram-edge"
                                d={d}
                                pathLength={1}
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth={1.25}
                                markerEnd={`url(#${markerId})`}
                            />
                            {edge.label && labelAt && (
                                <text x={labelAt.x} y={labelAt.y} textAnchor={labelAt.anchor} className="diagram-label fill-accent text-[12px]">
                                    {edge.label}
                                </text>
                            )}
                            {flowing && (
                                <circle r={3} className="fill-accent">
                                    <animateMotion
                                        dur="2.6s"
                                        begin={`${delay + 0.9}s`}
                                        repeatCount="indefinite"
                                        path={d}
                                        keyPoints="0;1"
                                        keyTimes="0;1"
                                        calcMode="linear"
                                    />
                                </circle>
                            )}
                        </g>
                    )
                })}

                {nodes.map((node, index) => (
                    <g key={node.id} className="diagram-node" style={{ '--d': `${index * 0.06}s` } as CSSProperties}>
                        <NodeBox node={node} />
                    </g>
                ))}
            </svg>
        </div>
    )
}

function NodeBox({ node }: { node: DiagramNode }) {
    const { x, y, kind } = node
    const stroke =
        kind === 'actor' ? 'var(--muted)' : kind === 'external' ? 'var(--ink)' : 'var(--accent)'

    return (
        <g>
            {kind === 'fleet' &&
                [12, 6].map((offset) => (
                    <rect
                        key={offset}
                        x={x + offset}
                        y={y - offset}
                        width={W}
                        height={H}
                        fill="var(--bg)"
                        stroke="var(--accent)"
                        strokeOpacity={0.5}
                    />
                ))}
            <rect
                x={x}
                y={y}
                width={W}
                height={H}
                fill={kind === 'external' ? 'var(--surface)' : 'var(--bg)'}
                stroke={stroke}
                strokeWidth={1.25}
                strokeDasharray={kind === 'actor' ? '4 4' : undefined}
            />
            {kind === 'data' && <line x1={x} x2={x + W} y1={y + 8} y2={y + 8} stroke="var(--accent)" strokeWidth={1} />}
            <text x={x + 14} y={y + (node.sub ? 28 : 37)} className="fill-ink text-[14px]">
                {node.label}
            </text>
            {node.sub && (
                <text x={x + 14} y={y + 47} className="fill-muted text-[11px]">
                    {node.sub}
                </text>
            )}
        </g>
    )
}

/**
 * Orthogonal route between two nodes: straight when they share a row or column,
 * otherwise out of the near side and into the top or bottom of the target.
 */
function route(a: DiagramNode, b: DiagramNode) {
    const acx = a.x + W / 2
    const acy = a.y + H / 2
    const bcx = b.x + W / 2
    const GAP = 4

    if (a.y === b.y) {
        const forward = b.x > a.x
        const x1 = forward ? a.x + W : a.x
        const x2 = forward ? b.x - GAP : b.x + W + GAP
        return { d: `M${x1},${acy} H${x2}`, labelAt: { x: (x1 + x2) / 2, y: acy - 10, anchor: 'middle' as const } }
    }

    if (a.x === b.x) {
        const down = b.y > a.y
        const y1 = down ? a.y + H : a.y
        const y2 = down ? b.y - GAP : b.y + H + GAP
        return { d: `M${acx},${y1} V${y2}`, labelAt: { x: acx + 12, y: (y1 + y2) / 2 + 4, anchor: 'start' as const } }
    }

    const forward = b.x > a.x
    const down = b.y > a.y
    const x1 = forward ? a.x + W : a.x
    const y2 = down ? b.y - GAP : b.y + H + GAP
    return { d: `M${x1},${acy} H${bcx} V${y2}`, labelAt: { x: (x1 + bcx) / 2, y: acy - 10, anchor: 'middle' as const } }
}

// Plain-language summary for screen readers.
function describe(nodes: DiagramNode[], edges: DiagramEdge[], byId: Map<string, DiagramNode>) {
    const flows = edges
        .map((edge) => `${byId.get(edge.from)?.label} to ${byId.get(edge.to)?.label}`)
        .join('; ')
    return `${nodes.length} parts. ${flows}.`
}
