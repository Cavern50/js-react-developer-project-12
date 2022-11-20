import React from 'react';
import './Main.style.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatData, changeCurrentChannel } from './slice/chat';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
export const Main = () => {

    const chatData = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    console.log(chatData);

    React.useEffect(() => {
        dispatch(fetchChatData())
    }, [])

    const changeChannelHandler = (id) => {
        return () => {
            dispatch(changeCurrentChannel(id))
        }
    }

    const currentChannel = chatData.channels.find((item) => item.id === chatData.currentChannelId);

    return (
        <div className='chat'>
            <div className="chatChannels">
                <ListGroup as="ul">
                    {
                        chatData.channels.map((item) => {
                            return (
                                <ListGroup.Item
                                    action as="li"
                                    variant="success"
                                    active={item.id === chatData.currentChannelId}
                                    onClick={changeChannelHandler(item.id)}>
                                    {item.name}
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </div>
            <div className='chatBlock'>
                <div className='chatHeader'>
                    <h4 className='chatTitle'>#{currentChannel?.name}</h4>
                </div>
                <div className='chatWindow'>
                    <div className='chatMessages'></div>
                    <Formik
                        initialValues={{ message: '' }}
                        onSubmit={alert}
                    >
                        {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                            return (
                                <form onSubmit={handleSubmit} className='chatForm'>
                                    <Form.Control
                                        type='textarea'
                                        name='username'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        isInvalid={errors.username}
                                        touched={touched.username?.toString()}
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>

        </div>
    )
}