import { Admin, Resource, ShowGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';

import { PostList, PostEdit, PostCreate } from './posts';
import { SiteList, SiteEdit, SiteCreate } from './sites';
import { UserList } from './users';
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
    >
        <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
        />
        <Resource
            name="sites"
            list={SiteList}
            edit={SiteEdit}
            create={SiteCreate}
            icon={PostIcon}
        />
        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            icon={UserIcon}
            recordRepresentation="name"
        />
    </Admin>
);

export default App;
