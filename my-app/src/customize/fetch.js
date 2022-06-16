import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';


/********************************************************************************
* + Nguyên tắc khi custom Hook phải bắt đầu bằng keyword use - dòng [11]
* + Tham số url có thể liên kết dùng chung với nhau - dòng [11]
* + Array Dependency phải chứa tham số - dòng [43]
**********************************************************************************/
const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // + Bằng với componentDidMount
    useEffect(() => {
        try {
            async function fetchData() {
                setTimeout(async () => {
                    let res = await axios.get(url);
                    let data = res && res.data ? res.data : []; // Check Data 
                    // Check Data and Convert Format Date Befor Set State
                    if (data && data.length > 0) {
                        data.map(item => {
                            item.Date = moment(item.Date).format('DD/MM/YYYY')
                            return item;
                        })
                        data = data.reverse();
                    }
                    setData(data);
                    setIsLoading(false);
                    setIsError(false)
                    // console.log(data);
                }, 5000);
            }
            fetchData()
        } catch (e) {
            setIsError(true);
            setIsLoading(false);
        }   
    }, [url]);

    return {
        data, isLoading, isError
    }

}

export default useFetch;