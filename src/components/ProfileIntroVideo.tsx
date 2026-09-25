import { useRef, useState, type PointerEvent } from 'react'
import { useLanguage, type Language } from '../context/LanguageContext'

interface ProfileIntroVideoProps {
  poster: string
  alt: string
}

function ProfileIntroVideo({ poster, alt }: ProfileIntroVideoProps) {
  const { language, t } = useLanguage()
  const videoUrl = `${import.meta.env.BASE_URL}files/profile-intro-${language}.mp4`
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [unavailableLanguage, setUnavailableLanguage] = useState<Language | null>(null)
  const videoUnavailable = unavailableLanguage === language
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogVideoRef = useRef<HTMLVideoElement>(null)

  const handleOpen = () => {
    setIsPreviewing(false)

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }

    if (!videoUnavailable && dialogVideoRef.current) {
      void dialogVideoRef.current.play().catch(() => undefined)
    }
  }

  const handleClose = () => {
    dialogVideoRef.current?.pause()
    setIsPreviewing(false)
  }

  const handleVideoError = () => {
    setUnavailableLanguage(language)
    previewVideoRef.current?.pause()
  }

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch' && !videoUnavailable) {
      setIsPreviewing(true)
    }
  }

  const handlePointerLeave = () => {
    setIsPreviewing(false)
    previewVideoRef.current?.pause()
  }

  return (
    <>
      <button
        type="button"
        aria-label={t('intro.video.open')}
        aria-haspopup="dialog"
        title={t('intro.video.open')}
        className="group relative h-20 w-20 overflow-hidden rounded border border-zinc-200 bg-zinc-100 outline-none transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none motion-reduce:hover:scale-100 dark:border-zinc-700 dark:bg-zinc-800"
        onClick={handleOpen}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={() => !videoUnavailable && setIsPreviewing(true)}
        onBlur={handlePointerLeave}
      >
        <img
          className="h-full w-full object-cover"
          src={poster}
          alt={alt}
          width={80}
          height={80}
          fetchPriority="high"
        />
        {isPreviewing && !videoUnavailable && (
          <video
            ref={previewVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoUrl}
            poster={poster}
            muted
            loop
            autoPlay
            playsInline
            preload="none"
            aria-hidden="true"
            onError={handleVideoError}
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-200 group-hover:bg-black/20 group-focus-visible:bg-black/20 motion-reduce:transition-none"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-body-14-medium text-white shadow-sm">
            ▶
          </span>
        </span>
        <span className="sr-only">{t('intro.video.open')}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="profile-intro-video-title"
        className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-black/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close()
          }
        }}
      >
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <h2
              id="profile-intro-video-title"
              className="text-body-15-medium font-medium"
            >
              {t('intro.video.title')}
            </h2>
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-body-14-medium text-zinc-600 outline-none transition-colors hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-accent dark:text-zinc-300 dark:hover:bg-zinc-800 motion-reduce:transition-none"
              onClick={() => dialogRef.current?.close()}
            >
              {t('intro.video.close')}
            </button>
          </div>

          <div className="min-h-0 overflow-y-auto">
            {videoUnavailable ? (
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <img
                  className="h-20 w-20 rounded object-cover"
                  src={poster}
                  alt={alt}
                  width={80}
                  height={80}
                />
                <p className="text-body-14-regular text-zinc-600 dark:text-zinc-400">
                  {t('intro.video.unavailable')}
                </p>
              </div>
            ) : (
              <>
                <video
                  ref={dialogVideoRef}
                  className="max-h-[70dvh] w-full bg-black object-contain"
                  src={videoUrl}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  preload="none"
                  aria-label={t('intro.video.playerLabel')}
                  onError={handleVideoError}
                  onEnded={(event) => {
                    event.currentTarget.currentTime = 0
                  }}
                >
                  {t('intro.video.unsupported')}
                </video>
                <p className="px-4 py-3 text-body-14-regular text-zinc-600 dark:text-zinc-400">
                  {t('intro.video.transcript')}
                </p>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ProfileIntroVideo
