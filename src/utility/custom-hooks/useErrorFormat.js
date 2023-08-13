import {useState, useEffect} from "react";
import React from "react";
import {ERROR_STATUS_CODE} from "../constant";

export default function useErrorFormat() {
    const [data, setData] = React.useState('')

    function handleError(error) {
        if (ERROR_STATUS_CODE.includes(error.response.status)) {
            if ('errors' in error.response.data) {
                if (Array.isArray(error.response.data.errors)) {
                    setData(error.response.data.errors.join(','))
                } else if (typeof error.response.data.errors === 'object') {
                    for (const [key, value] of Object.entries(error.response.data.errors)) {
                        if (Array.isArray(value) && key) {
                            setData(value.join(','))
                        } else {
                            setData(value)
                        }
                        break
                    }
                } else {
                    setData(error.response.data.errors)
                }
            } else if ('message' in error.response.data) {
                if (Array.isArray(error.response.data.message)) {
                    setData(error.response.data.message.join(''))
                } else {
                    setData(error.response.data.message)
                }
            }
        } else if (error.response.status === 401) {
            setData('session-timeout')
        } else {
            setData('Something went wrong while processing your request')
        }
    }

    return [data, handleError];
}
