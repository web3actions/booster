import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const mapGetters = () => {
  return Object.fromEntries(Object.keys(store.getters).map(getter => [getter, computed(() => store.getters[getter])]))
}

export { mapGetters }