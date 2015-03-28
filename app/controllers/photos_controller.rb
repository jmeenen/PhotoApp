class PhotosController < ApplicationController

  def index
    @users = User.all()
    @id = params[:id]
  end

  def new
    @users = User.all()
  end

  def create
    @users = User.all()
    params[:photo][:user_id] = session[:id]
    params[:photo][:date_time] = DateTime.now
    uploaded_file = params[:photo][:photo]
    params[:photo][:file_name] = uploaded_file.original_filename
    File.open(Rails.root.join('app', 'assets', 'images', uploaded_file.original_filename), 'wb') do |file|
      file.write(uploaded_file.read)
    end
    @photo = Photo.new(photo_params(params[:photo]))
    if @photo.save then
      redirect_to(:action => :index, :id => @photo.user.id)
    else
      render(:action => :new)
    end
  end

  def search
    @photos = Photo.search(params[:substring])
    render :partial => "html_show_photos"
  end

  private
  def photo_params(params)
    return params.permit(:user_id, :date_time, :file_name)
  end

end
