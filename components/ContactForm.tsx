'use client'

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretDown, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { contact } from '@/content/contact'
import { site } from '@/content/site'
import { EASE_OUT_EXPO } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Public by design (Web3Forms keys only allow submitting to the owner's inbox).
// Restrict the allowed domain in the Web3Forms dashboard.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'
type Field = 'name' | 'email' | 'service' | 'message'
type Errors = Partial<Record<Field, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data: FormData): Errors {
    const errors: Errors = {}
    const value = (key: string) => String(data.get(key) ?? '').trim()
    if (!value('name')) errors.name = 'Please tell me your name.'
    if (!value('email')) errors.email = 'I need an email to reply to.'
    else if (!EMAIL_PATTERN.test(value('email'))) errors.email = 'That email address looks incomplete.'
    if (!value('service')) errors.service = 'Pick the closest match.'
    if (value('message').length < 20) errors.message = 'A couple of sentences about the project helps a lot.'
    return errors
}

export default function ContactForm() {
    const reduce = useReducedMotion()
    const formRef = useRef<HTMLFormElement>(null)
    const [status, setStatus] = useState<Status>('idle')
    const [errors, setErrors] = useState<Errors>({})
    const [touched, setTouched] = useState(false)

    function revalidate() {
        if (touched && formRef.current) setErrors(validate(new FormData(formRef.current)))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const found = validate(data)
        setTouched(true)
        setErrors(found)
        if (Object.keys(found).length > 0) {
            const first = Object.keys(found)[0]
            form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
            return
        }
        if (!ACCESS_KEY) {
            setStatus('unconfigured')
            return
        }

        setStatus('sending')
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    ...Object.fromEntries(data),
                    access_key: ACCESS_KEY,
                    subject: `New project brief from ${data.get('name')}`,
                    from_name: `${site.name} portfolio`,
                }),
            })
            const result = (await response.json()) as { success?: boolean }
            if (!response.ok || !result.success) throw new Error('Submission rejected')
            form.reset()
            setTouched(false)
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    const sending = status === 'sending'

    return (
        <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                        className="flex flex-col items-start gap-6 border border-line p-8"
                    >
                        <CheckCircle size={32} className="text-accent" />
                        <p className="text-2xl font-medium tracking-tight">{contact.success}</p>
                        <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            className="text-sm text-muted underline underline-offset-4 hover:text-ink"
                        >
                            {contact.sendAnother}
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        ref={formRef}
                        noValidate
                        onSubmit={handleSubmit}
                        onChange={revalidate}
                        initial={false}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                    >
                        {/* Spam trap: hidden from people, filled in by bots. */}
                        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                        <FormField label="Name" error={errors.name}>
                            {(props) => <input {...props} name="name" type="text" autoComplete="name" className={inputClass} />}
                        </FormField>
                        <FormField label="Email" error={errors.email}>
                            {(props) => <input {...props} name="email" type="email" autoComplete="email" className={inputClass} />}
                        </FormField>
                        <FormField label="What do you need?" error={errors.service} className="sm:col-span-2">
                            {(props) => <Select {...props} name="service" options={contact.serviceOptions} />}
                        </FormField>
                        <FormField label="Budget" optional>
                            {(props) => <Select {...props} name="budget" options={contact.budgetOptions} />}
                        </FormField>
                        <FormField label="Timeline" optional>
                            {(props) => <Select {...props} name="timeline" options={contact.timelineOptions} />}
                        </FormField>
                        <FormField label="Project details" error={errors.message} className="sm:col-span-2">
                            {(props) => <textarea {...props} name="message" rows={6} className={cn(inputClass, 'h-auto resize-y py-3')} />}
                        </FormField>

                        {(status === 'error' || status === 'unconfigured') && (
                            <div role="alert" className="flex items-start gap-3 border border-danger/40 p-4 text-sm sm:col-span-2">
                                <WarningCircle size={20} className="mt-px shrink-0 text-danger" />
                                <p>
                                    {status === 'error' ? contact.error : contact.notConfigured}{' '}
                                    <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                                        {site.email}
                                    </a>
                                </p>
                            </div>
                        )}

                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={sending}
                                aria-busy={sending}
                                className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-accent px-8 text-[15px] font-medium text-accent-ink transition-[background-color,color,transform] duration-300 ease-out-expo hover:bg-ink hover:text-bg active:scale-[0.98] disabled:cursor-progress"
                            >
                                {sending ? contact.sending : contact.submit}
                                {sending && (
                                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
                                        <span className="block h-full w-1/3 animate-[sending_1.1s_ease-in-out_infinite] bg-accent-ink/70" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    )
}

const inputClass =
    'h-12 w-full border border-line bg-surface px-4 text-[15px] text-ink transition-colors placeholder:text-muted hover:border-ink/40 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-danger'

type ControlProps = { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }

function FormField({
    label,
    error,
    optional,
    className,
    children,
}: {
    label: string
    error?: string
    optional?: boolean
    className?: string
    children: (props: ControlProps) => ReactNode
}) {
    const id = useId()
    const errorId = `${id}-error`
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <label htmlFor={id} className="text-sm font-medium">
                {label}
                {optional && <span className="ml-2 font-normal text-muted">optional</span>}
            </label>
            {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? errorId : undefined })}
            {error && (
                <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger">
                    <WarningCircle size={16} className="shrink-0" />
                    {error}
                </p>
            )}
        </div>
    )
}

function Select({ options, name, ...props }: ControlProps & { options: readonly string[]; name: string }) {
    return (
        <div className="relative">
            <select {...props} name={name} defaultValue="" className={cn(inputClass, 'appearance-none pr-10')}>
                <option value="" disabled>
                    Choose one
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <CaretDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
        </div>
    )
}
