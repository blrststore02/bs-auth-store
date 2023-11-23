import { BsNumber } from "@/models/BsNumber";
import moment from "moment";
import { useState } from "react";
export const BsTable = (props: { list: any | any[], count: number, pageNum: number, selectedNum: Function, next: Function, prev: Function }) => {
    const [selectedNum, setSelectedNum] = useState<BsNumber>();
    const newRecordSelected = ($event: any, val: any) => {
        setSelectedNum(val);
        props.selectedNum(val);
    }
    return (
        <>
            <div className="w-[99%] h-[11/12] relative flex justify-between flex-col overflow-x-auto shadow-md sm:rounded-lg ml-1">
                <div className="relative h-full">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th></th>
                                <th scope="col" className="px-6 py-3">
                                    Rank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number
                                </th>
                            </tr>
                        </thead>
                        {props!.list && (<tbody className="w-full">
                            {props!.list && props!.list!.map((val: any, key: number) => {
                                return (
                                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" checked={selectedNum?.numberInsertionDate === val!.numberInsertionDate && selectedNum?.id === val!.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={($event) => newRecordSelected($event, val)} />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{val!.id}</td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{val!.numberInsertionDate && moment(val!.numberInsertionDate!).format('DD-MM-YYYY') || 'N/A'}</th>
                                        <td className="px-6 py-4">{val!.randomNumber || 'N/A'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>)}
                    </table>
                </div>
                {!props!.list && (<div className="h-full"><p aria-rowspan={2} aria-colspan={1} className="w-full h-full item-center text-center">No Record Found...</p></div>)}
                <nav className="flex items-center justify-between p-2" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{(props.pageNum * 10) + 1}-{(props.pageNum + 1) * 10 >= props.count ? props.count : (props.pageNum + 1) * 10}</span> of <span className="font-semibold text-gray-900 dark:text-white">{props.count}</span></span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <button disabled={props.pageNum <= 0} className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-[#EBEBE4] disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={($event) => props.prev($event)}>Previous</button>
                        </li>
                        <li>
                            <button disabled={(props.pageNum + 1) * 10 >= props.count} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg disabled:bg-[#EBEBE4] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={($event) => { props.next($event); }}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}