export default {
    state: {
        sampleState: undefined,
    },
    getters: {
        sampleGetter: (s: any) => s.sampleState,
    },
    mutations: {
        sampleMutation (state: any, idToken: string) {
            state.sampleState = idToken;
        }
    },
    actions: {},
}
