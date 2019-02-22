<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="DisplayPage.aspx.cs" Inherits="Ass2V0._2.DisplayPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h3>Display Contacts</h3>
            <asp:ListBox ID="listbox" runat="server" Height="500px"></asp:ListBox>
            <h4>Search on Contact</h4>
            <asp:TextBox ID="textbox_search" runat="server" CssClass="form-control" Width="300px"></asp:TextBox>
            <asp:Button ID="btn_search" runat="server" OnClick="btn_search_Click"  CssClass="btn btn-success" Text="Search"/>
        </div>
    </div>
</asp:Content>
