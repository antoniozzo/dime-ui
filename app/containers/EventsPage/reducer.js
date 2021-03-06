/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EVENTS,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_ERROR,
  SEARCH_EVENTS,
  SEARCH_EVENTS_SUCCESS,
  SEARCH_EVENTS_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_SUCESS,
  DELETE_EVENT_ERROR,
  CLICK_EVENT_TAG,
  TOOGLE_EVENT_TAG_SUCESS,
  TOOGLE_EVENT_TAG_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: {},
  data: [],
});

function eventsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('loading', true)
        .set('data', fromJS([]));
    case LOAD_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', fromJS({}))
        .set('data', fromJS(action.events).reverse());
    case LOAD_EVENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('data', fromJS([]));
    case SEARCH_EVENTS:
      return state
        .set('loading', true);
    case SEARCH_EVENTS_SUCCESS:
      return state
        .set('data', fromJS(action.documents).reverse())
        .set('loading', false)
        .set('error', fromJS({}));
    case SEARCH_EVENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case DELETE_EVENT:
      return state
        .set('loading', true);
    case DELETE_EVENT_SUCESS:
      return state
        .set('loading', false)
        .set('error', fromJS({}))
        .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.eventID)]);
    case DELETE_EVENT_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case CLICK_EVENT_TAG:
      return state
        .set('loading', true)
        .set('error', fromJS({}));
    case TOOGLE_EVENT_TAG_SUCESS: {
      const eventIndex = state.get('data').findIndex((item) => item.get('id') === action.respond.id);
      const newEventWithNewTags = fromJS(action.respond);
      return state
        .set('loading', false)
        .set('error', fromJS({}))
        .setIn(['data', eventIndex, 'tags'], newEventWithNewTags.getIn(['tags']));
    }
    case TOOGLE_EVENT_TAG_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    default:
      return state;
  }
}

export default eventsPageReducer;
