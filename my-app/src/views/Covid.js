/* eslint-disable react-hooks/exhaustive-deps */
import '../style/covid.css';
import useFetch from '../customize/fetch';

const Covid = () => {

    const API = 'https://api.covid19api.com/country/vietnam?from=2021-10-01T00%3A00%3A00Z&to=2021-10-20T00%3A00%3A00Z';
    const {data: dataCovid, isError , isLoading} = useFetch(API); // API là Url dùng chung.

    return (
        <div className='container py-5'>
            <div className='row p-4'>
                <div className='col-12'>
                    <h1>Tracking Covid-19 Data In VietNam</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Confirmed</th>
                                <th scope="col">Active</th>
                                <th scope="col">Deaths</th>
                                <th scope="col">Recovered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isError === false && isLoading === false && dataCovid && dataCovid.length > 0 &&
                                dataCovid.map(item => {
                                    return (
                                        <tr key={item.ID}>
                                            <td>{item.Date}</td>
                                            <td>{item.Confirmed}</td>
                                            <td>{item.Active}</td>
                                            <td>{item.Deaths}</td>
                                            <td>{item.Recovered}</td>
                                        </tr>
                                    )
                                })
                            }
                            {isLoading === true &&
                                <td colspan="5">
                                    <div className="spinner-grow text-light mt-3" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>    
                            }
                            {isError === true &&
                                <td colspan="5">
                                    <h5>Something wrong .... !</h5>
                                </td>    
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Covid;