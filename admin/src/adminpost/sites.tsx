import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
    useRecordContext,
} from 'react-admin';

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const SiteList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="url" />
            <TextField source="name" />
            <TextField source="interval" />
            <EditButton />
        </Datagrid>
    </List>
);

const SiteTitle = () => {
    const record = useRecordContext();
    return <span>Site {record ? `"${record.title}"` : ''}</span>;
};

export const SiteEdit = () => (
    <Edit title={<SiteTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5} />
        </SimpleForm>
    </Edit>
);

export const SiteCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="url" />
            <TextInput source="name" />
            <TextInput source="interval" />
        </SimpleForm>
    </Create>
);
