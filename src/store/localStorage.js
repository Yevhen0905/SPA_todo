
// встановлюємо дані в сховище
export const saveState = (state) => {
  localStorage.setItem('todoLists', JSON.stringify(state))
}
// завантаження з сховища
export const loadState = () => {
  return JSON.parse(localStorage.getItem('todoLists')) 
}
