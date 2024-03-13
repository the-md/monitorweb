import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    FunctionField,
    useRecordContext,
    FormDataConsumer,
    required
} from 'react-admin'

const postFilters = [
    <TextInput key="searchInput" source="q" label="Search" alwaysOn/>
]

export const NotificationList = () => {
    const currentUserId = localStorage.getItem('userId')

    const render = (record: any) => {
        console.log(record)
        let source = 'address'
        switch (record.type) {
            case 'email':
                source = 'address'
                break
            case 'telegram':
                source = 'tgName'
                break
        }

        return <TextField source={source} />
    }

    return (
        <List filters={postFilters} filter={{ userId: currentUserId }}>
            <Datagrid>
                <TextField source="type"/>
                <FunctionField label="Info" render={render}/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

const NotificationTitle = () => {
    const record = useRecordContext()
    const title = typeof record.title === 'string' ? `"${record.title}"` : ''
    return <span>Notification {title}</span>
}

export const NotificationEdit = () => (
    <Edit title={<NotificationTitle/>}>
        <SimpleForm>
            <TextInput source="type" disabled/>
            <FormDataConsumer>
                {({ formData, ...rest }) => {
                    const formDataNew = useRecordContext()
                    if (formDataNew.type === 'email') {
                        return <TextInput source="address" validate={required()} {...rest} />
                    }
                    if (formDataNew.type === 'telegram') {
                        return (
                            <>
                                <TextInput source="tgName" label="Telegram name" />
                                <TextInput source="tgCode" label="Telegram code" validate={required()} {...rest} />
                            </>
                        )
                    }
                    return null
                }}
            </FormDataConsumer>
        </SimpleForm>
    </Edit>
)

export const NotificationCreate = () => {
    const userId = localStorage.getItem('userId')
    const transform = (data: any) => ({
        ...data,
        userId
    })

    return (
        <Create redirect="list" transform={transform}>
            <SimpleForm>
                <SelectInput source="type" validate={required()} choices={[
                    { id: 'email', name: 'Email' },
                    { id: 'telegram', name: 'Telegram' }
                ]} />
                <FormDataConsumer>
                    {({ formData }) => {
                        console.log('formData', formData)
                        if (formData.type === 'email') {
                            return <TextInput source="address" validate={required()} />
                        }
                        if (formData.type === 'telegram') {
                            return (
                                <>
                                    <TextInput source="tgName" label="Telegram name" />
                                    <TextInput source="tgCode" label="Telegram code" validate={required()} />
                                </>
                            )
                        }
                        return null
                    }}
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    )
}
