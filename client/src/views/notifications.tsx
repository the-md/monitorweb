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

export const NotificationList = () => {
    const currentUserId = localStorage.getItem('userId');

    return (
        <List filters={postFilters} filter={{ userId: currentUserId }}>
            <Datagrid>
                <TextField source="type" />
                <TextField source="address" />
                <EditButton />
            </Datagrid>
        </List>
    );
};

const NotificationTitle = () => {
    const record = useRecordContext();
    return <span>Notification {record ? `"${record.title}"` : ''}</span>;
};

export const NotificationEdit = () => (
    <Edit title={<NotificationTitle />}>
        <SimpleForm>
            <TextInput source="type" />
            <TextInput source="address" />
        </SimpleForm>
    </Edit>
);

export const NotificationCreate = () => {
    const userId = localStorage.getItem('userId');
    const transform = (data:any) => ({
        ...data,
        userId,
    });

    return (
        <Create redirect="list" transform={transform}>
            <SimpleForm>
                <TextInput source="type" />
                <TextInput source="address" />
            </SimpleForm>
        </Create>
    );
};