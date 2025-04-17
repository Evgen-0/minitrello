import { ref, inject, provide } from 'vue'

const key = Symbol('loader')

export function createLoader() {
  const isLoading = ref(false)

  const show = () => { isLoading.value = true }
  const hide = () => { isLoading.value = false }

  provide(key, {
    isLoading,
    show,
    hide
  })
}

export function useLoader() {
  const loader = inject<{
    isLoading: typeof ref
    show: () => void
    hide: () => void
  }>(key)

  if (!loader) throw new Error('Loader not provided')

  return loader
}
