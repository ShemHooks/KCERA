import { ContactEmergency,} from "@mui/icons-material"

export const Sidebar =  [

    {
        kind: 'header',
        title: 'Requests'
    },

    {
        segment: 'request',
        title: 'Request Emergency',
        icon: <ContactEmergency/>
    },

    {
        kind: 'divider',

    },

    {
        kind: 'header',
        title: 'accounts'
    },

    {
        segment: 'accountSettings',
        title: 'accounts page'
    }
  
];