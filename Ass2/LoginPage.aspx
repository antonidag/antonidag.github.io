<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="LoginPage.aspx.cs" Inherits="Ass2V0._2.LoginPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h3>Login in</h3>
            <h4>Username:</h4>
            <asp:TextBox ID="textbox_username" runat="server" Width="300px" CssClass="form-control"></asp:TextBox>
            <h4>Password:</h4>
            <asp:TextBox ID="textbox_password" runat="server" Width="300px" TextMode="Password" CssClass="form-control"></asp:TextBox>
            <asp:Button ID="btn_login" runat="server" CssClass="btn btn-primary" Text="Login" OnClick="btn_login_Click" />
        </div>
    </div>

</asp:Content>
