import { connect } from 'react-redux'
import { wheatherActions } from '../../APIControllers/actions/wheatherActions'
import { imagesActions } from '../../APIControllers/actions/imagesActions'

const mapStateToProps = state => ({
    ...state
})

const actions  = Object.assign({},wheatherActions,imagesActions)

export const withRedux = connect(mapStateToProps,actions)
