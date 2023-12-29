import { Admin, Resource, ShowGuesser } from 'react-admin';
import dataProvider from './services/dataProvider';
import SiteIcon from '@mui/icons-material/Book';
import { SiteList, SiteEdit, SiteCreate } from './views/sites';
import { Dashboard } from './components/Dashboard';
import { authProvider } from './services/authProvider';
import { Layout, Login } from './layout';

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
        layout={Layout}
        loginPage={Login}
    >
        <Resource
            name="sites"
            list={SiteList}
            edit={SiteEdit}
            create={SiteCreate}
            icon={SiteIcon}
        />
    </Admin>
);

export default App;
