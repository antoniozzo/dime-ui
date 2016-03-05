import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import EventsPage from './components/eventsPage'
import DocumentsPage from './components/documentsPage'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={EventsPage} />
        <Route path="events" component={EventsPage}/>
        <Route path="documents" component={DocumentsPage}/>
    </Route>
)