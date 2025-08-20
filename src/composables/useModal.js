import { getCurrentInstance } from 'vue'

export function useModal() {
  const vm = getCurrentInstance()
  const modal = vm.appContext.app._context.components.BaseModalInstance
  return modal
}
