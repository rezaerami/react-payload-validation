export default validations => () => next => async action => {
  if (!validations[action.type]) {
    next(action);
  } else {
    const validation = new validations[action.type]();
    try {
      await validation.validate(action.payload);
      validation.accept(action.type);
      next(action);
    } catch (e) {
      console.error(e);
      validation.reject(action.type);
    }
  }
};
