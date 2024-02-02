import * as React from 'react'
import { Layout, type LayoutProps } from 'react-admin'
import AppBar from './AppBar'

const MyLayout = (props: LayoutProps) => (
    <Layout {...props} appBar={AppBar}/>
)
export default MyLayout
