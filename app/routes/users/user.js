import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    limit: {
      refreshModel: true
    }
  },
  model(params){

    return this.store.findRecord("user",params.user_id,{ adapterOptions: { query: {limit:params.limit} } });
  },

  actions:{
    loadMore(){
      var increment=10;

      const limit = this.controllerFor('users.user').get('limit');

      this.transitionTo({queryParams: { limit: limit+increment}});

    },
    createComment(text,user){

      var comment=this.store.createRecord("comment",{
        text:text,
        user:user
      });
      var that=this;
      comment.save().then(function(){
        comment.reload().then(function(){
          that.refresh();

        });

      });

    },
    toggleFavorite(){
      var isFavorited=this.controllerFor('users.user').get("model.isfavorited");
      var selectedUser=this.controllerFor('users.user').get("model");
      console.log(isFavorited);
      if(!isFavorited){
        var f =this.store.createRecord("favorite",{
          favoritee:selectedUser
        })
        f.save().then(()=>{this.refresh();});
        return;
      }
      var found = false;
      var favorites =this.store.peekAll("favorite");
      favorites.forEach((favorite)=>{
        if(favorite.get("favoritee.id")==selectedUser.get("id")){
          found = true;
          favorite.destroyRecord().then(()=>{
            this.refresh();
          });

        }
      });

      if(!found){
        this.store.findAll("favorite").then((favorites)=>{
          favorites.forEach((favorite)=>{
            if(favorite.get("favoritee.id")==selectedUser.get("id")){
              ffavorite.destroyRecord().then(()=>{
                this.refresh();
              });

            }
          });
        });
      }


    },
  blurBackground(blur) {
     this.controllerFor('application').set('blur', blur);
   }
},
});
