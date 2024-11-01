import {
    ColumnDef,
    createSolidTable,
    flexRender,
    getCoreRowModel,
    Table as TTable,
    TableOptions
} from "@tanstack/solid-table";
import {createRenderEffect, createSignal, For, JSXElement} from "solid-js";
import {Table as STable, TableBody, TableCell, TableFooter, TableHead, TableRow} from "@suid/material";

export type TableProps<T> = {
    columns: ColumnDef<T>[]
    data: T[]
}

export function Table<T>(props: TableProps<T>): JSXElement {
    const [table, setTable] = createSignal<TTable<T>>(createSolidTable<T>({
        columns: [],
        data: [],
        getCoreRowModel: getCoreRowModel()
    }))

    createRenderEffect(() => {
        const options: TableOptions<T> = {
            columns: props.columns,
            data: props.data,
            getCoreRowModel: getCoreRowModel(),
        }
        const table = createSolidTable(options)
        setTable(table)
    })

    return (
        <STable>
            <TableHead>
                <For each={table().getHeaderGroups()}>
                    {headerGroup => (
                        <TableRow>
                            <For each={headerGroup.headers}>
                                {header => (
                                    <TableCell>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                )}
                            </For>
                        </TableRow>
                    )}
                </For>
            </TableHead>
            <TableBody>
                <For each={table().getRowModel().rows}>
                    {row => (
                        <TableRow>
                            <For each={row.getVisibleCells()}>
                                {cell => (
                                    <TableCell>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                )}
                            </For>
                        </TableRow>
                    )}
                </For>
            </TableBody>
            <TableFooter>
                <For each={table().getFooterGroups()}>
                    {footerGroup => (
                        <TableRow>
                            <For each={footerGroup.headers}>
                                {header => (
                                    <TableCell>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                )}
                            </For>
                        </TableRow>
                    )}
                </For>
            </TableFooter>
        </STable>


    )


}