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
        
        const ourRequest = axios.CancelToken.source() // <-- 1st step

        async function fetchData() {
            try {
                let res = await axios.get(url, {
                    cancelToken: ourRequest.token, // <-- 2nd step
                });
                let data = res && res.data ? res.data : []; // Check Data 
                // Check Data and Convert Format Date Before Set State
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

            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        }
        setTimeout(() => {
            fetchData();
        }, 3000);

        return () => {
            ourRequest.cancel('Operation canceled by the user.') // <-- 3rd step
        }

    }, [url]);

    // Trả data về
    return {
        data, isLoading, isError
    }

}

export default useFetch;