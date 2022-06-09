import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Loading from './Loading';

export default function DataTableSearch() {
    const [dataTable, setDataTable] = useState({});
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                let newCountries = data?.map((country) => {
                    const details = {
                        name: country?.name?.common,
                        area: country?.area,
                        population: country?.population,
                        region: country?.region || "N/A",
                        timeZone: country?.timezones[0]
                    }
                    return details;
                })
                setDataTable({
                    columns: [
                        {
                            label: 'Name',
                            field: 'name',
                            width: 250,
                            attributes: {
                                'aria-controls': 'DataTable',
                                'aria-label': 'Name',
                            },
                        },
                        {
                            label: 'Area',
                            field: 'area',
                            width: 200,
                        },
                        {
                            label: 'Population',
                            field: 'population',
                            sort: 'asc',
                            width: 100,
                        },
                        {
                            label: 'Region',
                            field: 'region',
                            sort: 'asc',
                            width: 100,
                        },
                        {
                            label: 'Time Zone',
                            field: 'timeZone',
                            sort: 'disabled',
                            width: 150,
                        },
                    ],
                    rows: newCountries,
                })
                setIsLoading(false);

            })

    }, [])


    if (isloading) {
        return <Loading />
    }

    return (
        <div className="my-4">
            <h1>Rest Countries</h1>

            <MDBDataTableV5
                hover
                entriesOptions={[7, 10, 15, 20, 25, 50]}
                entries={7}
                data={dataTable}
                pagingTop
                searchTop
                searchBottom={false}
                barReverse
                fullPagination
            />
        </div>
    );
}