class CommentsController < ApplicationController

  def new
    @users = User.all()
    @photo_id = params[:id]
  end

  def create
    @users = User.all()
    @photo_id = params[:id]
    params[:comment][:photo_id] = @photo_id
    params[:comment][:user_id] = session[:id]
    params[:comment][:date_time] = DateTime.now
    @comment = Comment.new(comment_params(params[:comment]))
    if @comment.save then
      redirect_to(:controller => :photos, :action => :index, :id => @comment.photo.user.id)
    else
      render(:action => :new, :id => @photo_id)
    end
  end

  private
  def comment_params(params)
    return params.permit(:photo_id, :user_id, :date_time, :comment)
  end

end
