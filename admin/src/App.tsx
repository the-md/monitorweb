import { Admin, Resource } from 'react-admin';
import SiteIcon from '@mui/icons-material/Book';
import { SiteList, SiteEdit, SiteCreate } from './views/sites';
import { Dashboard } from './components/Dashboard';
import { authProvider } from './services/authProvider';
import { Layout, Login } from './layout';
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
    </Admin>
);

export default App;
