import { ContactEmergency, } from "@mui/icons-material"

export const Sidebar = [

    {
        kind: 'header',
        title: 'task'
    },

    {
        segment: 'history',
        title: 'History',
        icon: <ContactEmergency />
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