function Comment() {
  /* tslint:disable */
  /* tslint:enable */
  /* tslint:disable:rule1 rule2 rule3... */
  /* tslint:enable:rule1 rule2 rule3... */
  // tslint:disable-next-line
  someCode(); // tslint:disable-line
  // tslint:disable-next-line:rule1 rule2 rule3...

  return <div>TestComment</div>;
}

export default Comment;
