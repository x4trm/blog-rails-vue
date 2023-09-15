class PostPolicy < ApplicationPolicy
    # class Scope < Scope
    #     def resolve
    #       if current_user.admin
    #         scope.all
    #       else
    #         scope.where(content: "")
    #       end
    #     end
    # end
    
    def index?
        true
    end
    def create?
        @user && @user.admin?
    end
    def destroy?
        return true if @user.admin?
    end
end