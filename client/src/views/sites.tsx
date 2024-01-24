import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    useRecordContext
} from 'react-admin';

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
];

export const SiteList = () => {
    const currentUserId = localStorage.getItem('userId');

    return (
        <List filters={postFilters} filter={{ userId: currentUserId }}>
            <Datagrid>
                <TextField source="url" />
                <TextField source="name" />
                <TextField source="interval" />
                <EditButton />
            </Datagrid>
        </List>
    );
};

const SiteTitle = () => {
    const record = useRecordContext();
    return <span>Site {record ? `"${record.title}"` : ''}</span>;
};

export const SiteEdit = () => (
    <Edit title={<SiteTitle />}>
        <SimpleForm>
            <TextInput source="url" />
            <TextInput source="name" />
            <TextInput source="interval" />
        </SimpleForm>
    </Edit>
);

export const SiteCreate = () => {
    const userId = localStorage.getItem('userId');
    const transform = (data:any) => ({
        ...data,
        userId, // Добавляем userId к данным
    });

    return (
        <Create redirect="list" transform={transform}>
            <SimpleForm>
                <TextInput source="url" />
                <TextInput source="name" />
                <TextInput source="interval" />
            </SimpleForm>
        </Create>
    );
};