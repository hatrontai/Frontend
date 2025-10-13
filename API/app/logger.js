function logger(ms, type= 'error') {
    console[type](ms);
}

export default logger
// export default module (only one default)