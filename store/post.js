export const state = () => ({
    postlist: []
})

export const mutations = {
    setPostData(state,data){
        state.postlist=data
    }
}