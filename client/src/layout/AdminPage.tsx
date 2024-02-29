import { authProvider } from '../services/authProvider'
import { Dashboard } from '../components/Dashboard'
import { Layout, Login } from './index'
import { Admin, Resource, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
import { SiteCreate, SiteEdit, SiteList } from '../views/sites'
import SiteIcon from '@mui/icons-material/Book'
import { NotificationCreate, NotificationEdit, NotificationList } from '../views/notifications'
import jsonServerProvider from 'ra-data-json-server'
import { httpClient } from '../services/httpClient'
import Register from '../layout/Register'

const dataProvider = jsonServerProvider(import.meta.env.APP_API_URL, httpClient)

const AdminPage = () => (
    <Admin
        basename="/admin"
        authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
        layout={Layout}
        loginPage={Login}
        requireAuth
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
        <CustomRoutes>
            <Route path="/register" element={<Register/>}/>
        </CustomRoutes>
    </Admin>
)

export default AdminPage
