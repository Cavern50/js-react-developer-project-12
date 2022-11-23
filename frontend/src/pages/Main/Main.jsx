import React from 'react';
import './Main.style.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatData, changeCurrentChannel, addMessage } from './slice/chat';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { io } from "socket.io-client";
import {useAuthContext} from "utils/auth";
import {api} from "api/api";

const socket = io("ws://");

export const Main = () => {
    const auth = useAuthContext();
    const chatData = useSelector((state) => state.chat);

    const dispatch = useDispatch();



    React.useEffect(() => {
        dispatch(fetchChatData());
        // socket.emit('removeChannel', { id: 1 });
    }, [])

    const changeChannelHandler = (id) => {
        return () => {
            dispatch(changeCurrentChannel(id))
        }
    }

    const currentChannel = chatData.channels.find((item) => item.id === chatData.currentChannelId);
    React.useEffect(() => {
        socket.on('newMessage', (payload) => {
            console.log(payload, chatData.messages);
            dispatch(addMessage(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        });
    }, []);

    const onSubmit = ({message}) => {
        socket.emit('newMessage', { body: message, channelId: currentChannel?.id, username: auth.username });
    }

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
                    <div className='chatMessages'>
                            {chatData.messages.filter((item) => item.channelId === currentChannel?.id).map((message) => {
                            return (
                                <>
                                    <h3>{message.username}</h3>
                                    <p>{message.body}</p>
                                </>
                            )
                        })}
                    </div>
                    <Formik
                        initialValues={{ message: '' }}
                        onSubmit={onSubmit}
                    >
                        {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                            return (
                                <form onSubmit={handleSubmit} className='chatForm'>
                                    <Form.Control
                                        type='textarea'
                                        name='message'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        isInvalid={errors.message}
                                        touched={touched.message?.toString()}
                                    />
                                    <button>отправить</button>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>

        </div>
    )
}