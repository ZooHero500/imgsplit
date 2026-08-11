import { useTranslations } from "next-intl"
import { LogoIcon } from "@/components/LogoIcon"
import { InkButton } from "@/components/ui/InkButton"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-8">
          <LogoIcon className="h-6 w-6 text-foreground" />
        </div>

        <span className="font-serif text-8xl md:text-9xl text-foreground/10 leading-none block mb-6">
          404
        </span>

        <h1 className="font-serif text-3xl md:text-4xl leading-[0.9] mb-4">
          {t("title")}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          {t("description")}
        </p>

        <InkButton href="/" icon={<ArrowLeft />}>
          {t("backHome")}
        </InkButton>
      </div>
    </main>
  )
}
