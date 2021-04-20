export default {
  statusLimit: 20,
  scrollLimit: 10,
  //@ts-ignore
  token: localStorage.getItem('token'),
  //@ts-ignore
  instance: JSON.parse(localStorage.getItem('instance')),
  reload: () => {
    //@ts-ignore
    this.token = localStorage.getItem('token')
    //@ts-ignore
    this.instance = JSON.parse(localStorage.getItem('instance'))
  }
}
