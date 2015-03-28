class UsersController < ApplicationController

  def index
    @users = User.all()
    @id = params[:id]
  end

  def login
  end

  def post_login
    @user = User.find_by_login(params[:login])
    if @user && @user.password_valid?(params[:password]) then
      session[:id] = @user.id
      redirect_to :controller => :photos, :action => :index, :id => session[:id]
    elsif @user
      flash[:notice] = "Incorrect Password"
      render(:action => :login)
    else
      flash[:notice] = "Invalid Login"
      render(:action => :login)
    end
  end

  def logout
    reset_session
    redirect_to(:action => :login)
  end

  def new
    @users = User.all()
  end

  def create
    @users = User.all()
    @user = User.new(user_params(params[:user]))
    if @user.password != params[:user][:repeat_password] then
      flash[:notice] = "Passwords must match"
      render(:action => :new)
    elsif @users.find_by_login(@user.login)
      flash[:notice] = "Username already exists"
      render(:action => :new)
    elsif @user.save then
      flash[:notice] = nil
      redirect_to(:action => :login)
    else
      render(:action => :new)
    end
  end

  private
  def user_params(params)
    return params.permit(:first_name, :last_name, :login, :password)
  end

end