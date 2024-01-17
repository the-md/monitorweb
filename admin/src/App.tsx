import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from "react-router-dom";
import SiteIcon from '@mui/icons-material/Book';
import { SiteList, SiteEdit, SiteCreate } from './views/sites';
import { NotificationList, NotificationEdit, NotificationCreate } from './views/notifications';
import { Dashboard } from './components/Dashboard';
import { authProvider } from './services/authProvider';
import { Layout, Login, Register } from './layout';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://localhost:5000/api');

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
        layout={Layout}
        loginPage={Login}
    >
        <Resource
            name="site"
            list={SiteList}
            edit={SiteEdit}
            create={SiteCreate}
            icon={SiteIcon}
        />
        <Resource
            name="notification"
            list={NotificationList}
            edit={NotificationEdit}
            create={NotificationCreate}
            icon={SiteIcon}
        />
        <CustomRoutes noLayout>
            <Route path="/register" element={<Register />} />
        </CustomRoutes>
    </Admin>
);

export default App;
