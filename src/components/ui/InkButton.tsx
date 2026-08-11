"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"

/**
 * InkButton — the signature "ink" action button from the Ink Edition design.
 * Bordered paper cell with a signal sweep-in, label nudge and icon-cell
 * inversion on hover; ink press fill on active. Supports hero / dense sizes,
 * an optional leading `small` caption and a trailing icon cell.
 * Pass `href` to render as a link (internal routes use the i18n Link).
 */
function InkButton({
  className,
  variant = "default",
  size = "default",
  href,
  icon,
  small,
  busy = false,
  status = "default",
  children,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "inverse"
  size?: "default" | "hero" | "dense"
  /** Render as a link instead of a button (internal paths use the i18n Link). */
  href?: string
  /** Content rendered in the right-hand icon cell. Omit for a full-width label. */
  icon?: React.ReactNode
  /** Small caption rendered before the label (e.g. "01"). */
  small?: React.ReactNode
  busy?: boolean
  status?: "default" | "success" | "error"
}) {
  const [pressed, setPressed] = React.useState(false)

  const classNameFinal = cn(
    "ink-button",
    size === "hero" && "ink-button--hero",
    size === "dense" && "ink-button--dense",
    variant === "inverse" && "ink-button--inverse",
    status === "success" && "is-success",
    status === "error" && "is-error",
    !icon && "ink-button--no-icon",
    pressed && "is-pressed",
    className
  )

  const handlers = {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      if (props.disabled || props["aria-disabled"] === "true") return
      setPressed(true)
      event.currentTarget.setPointerCapture?.(event.pointerId)
      props.onPointerDown?.(event as never)
    },
    onPointerUp: (event: React.PointerEvent<HTMLElement>) => {
      setPressed(false)
      props.onPointerUp?.(event as never)
    },
    onPointerCancel: (event: React.PointerEvent<HTMLElement>) => {
      setPressed(false)
      props.onPointerCancel?.(event as never)
    },
    onLostPointerCapture: (event: React.PointerEvent<HTMLElement>) => {
      setPressed(false)
      props.onLostPointerCapture?.(event as never)
    },
  }

  const inner = (
    <>
      <span className="ink-button__label">
        {small != null && <small>{small}</small>}
        <span>{children}</span>
      </span>
      {icon != null && (
        <span className="ink-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  )

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:")
    const anchorProps = {
      "data-slot": "ink-button",
      className: classNameFinal,
      "aria-busy": busy || undefined,
      href,
      ...handlers,
      ...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>),
    }

    if (isExternal) {
      return (
        <a {...anchorProps} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      )
    }
    return (
      <Link {...anchorProps}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      data-slot="ink-button"
      className={classNameFinal}
      aria-busy={busy || undefined}
      {...handlers}
      {...props}
    >
      {inner}
    </button>
  )
}

export { InkButton }
