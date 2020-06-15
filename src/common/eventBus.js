class EventBus {
  constructor() {
    this.events = this.events || new Object(); 
  }
}
EventBus.prototype.emit = function(type, ...args) { 
  let e = this.events[type] || []
  for (let i = 0; i < e.length; i++) {   
    e[i].apply(this, args);    
  }  
};

EventBus.prototype.addListener = function(eventType, fun) { 
  const [type, id] = eventType.split('#')
  
  if (id) {
    this.events[eventType] = [fun];
  } else {
    this.events[type] = this.events[type] || []; 
    this.events[type].push(fun);
  }
};
EventBus.prototype.on = EventBus.prototype.addListener;
const eventBus = new EventBus();

export default eventBus;
