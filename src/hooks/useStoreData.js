
const useStoreData = (dataname,data) =>{

    const objString = JSON.stringify(data);

    const setData = () =>{
        localStorage.setItem(dataname,objString);
    }

    const getData = () =>{
        const data = localStorage.getItem(dataname);
        return JSON.parse(data);
    }
}