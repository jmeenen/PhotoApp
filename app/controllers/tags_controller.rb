class TagsController < ApplicationController

  def new
    @users = User.all()
    @photo_id = params[:id]
  end

  def create
    @users = User.all()
    @photo_id = params[:id]
    params[:tag][:photo_id] = @photo_id
    @tag = Tag.new(tag_params(params[:tag]))
    if @tag.save then
      redirect_to(:controller => :photos, :action => :index, :id => @tag.photo.user.id)
    else
      render(:action => :new, :id => @photo_id)
    end
  end

  private
  def tag_params(params)
    return params.permit(:photo_id, :user_id, :X, :Y, :width, :height)
  end

end
