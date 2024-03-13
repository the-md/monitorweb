import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    useRecordContext,
    SelectInput,
    required
} from 'react-admin'

const postFilters = [
    <TextInput key="searchInput" source="q" label="Search" alwaysOn/>
]

export const SiteList = () => {
    const currentUserId = localStorage.getItem('userId')

    return (
        <List filters={postFilters} filter={{ userId: currentUserId }}>
            <Datagrid>
                <TextField source="url"/>
                <TextField source="name"/>
                <TextField source="interval"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

const SiteTitle = () => {
    const record = useRecordContext()
    const title = typeof record.title === 'string' ? `"${record.title}"` : ''
    return <span>Site {title}</span>
}

export const SiteEdit = () => (
    <Edit title={<SiteTitle/>}>
        <SimpleForm>
            <TextInput source="url" disabled/>
            <TextInput source="name"/>
            <SelectInput source="interval" validate={required()} choices={[
                { id: '1', name: '1 minute' },
                { id: '5', name: '5 minutes' },
                { id: '15', name: '15 minutes' },
                { id: '30', name: '30 minutes' }
            ]} />
        </SimpleForm>
    </Edit>
)

export const SiteCreate = () => {
    const userId = localStorage.getItem('userId')
    const transform = (data: any) => ({
        ...data,
        userId // Добавляем userId к данным
    })

    return (
        <Create redirect="list" transform={transform}>
            <SimpleForm>
                <TextInput source="url" validate={[required()]} />
                <TextInput source="name"/>
                <SelectInput source="interval" validate={required()} choices={[
                    { id: '1', name: '1 minute' },
                    { id: '5', name: '5 minutes' },
                    { id: '15', name: '15 minutes' },
                    { id: '30', name: '30 minutes' }
                ]} />
            </SimpleForm>
        </Create>
    )
}
