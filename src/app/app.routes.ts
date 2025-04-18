import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostComponent } from './components/post/post.component';
import { TodoComponent } from './components/todo/todo.component';
import { QuoteComponent } from './components/quote/quote.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AddcartComponent } from './components/addcart/addcart.component';
import { AddcommentComponent } from './components/addcomment/addcomment.component';
import { AddtodoComponent } from './components/addtodo/addtodo.component';
import { AddrecipeComponent } from './components/addrecipe/addrecipe.component';
import { AddquoteComponent } from './components/addquote/addquote.component';
import { HomeComponent } from './components/home/home.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { ContactlistComponent } from './components/contactlist/contactlist.component';
import { ProductsComponent } from './components/products/products.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { CalculatorComponent } from './components/calculator/calculator.component';



export const routes: Routes = [
    {path: '',component: LoginComponent},
    {path: 'dashboard',component: HomeComponent},
    {path: 'contactus', component: ContactusComponent},
    {path: 'footer', component: FooterComponent},
    {path: 'cart', component: CartComponent},
    {path: 'comment', component: CommentComponent},
    {path: 'post', component: PostComponent},
    {path: 'todo', component: TodoComponent},
    {path: 'quote', component: QuoteComponent},
    {path: 'recipe', component: RecipeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'createpost', component: CreatepostComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'addcart', component: AddcartComponent},
    {path: 'addcomment', component: AddcommentComponent},
    {path: 'addtodo', component: AddtodoComponent},
    {path: 'addrecipe', component: AddrecipeComponent},
    {path: 'addquote', component: AddquoteComponent},
    {path: 'home', component: HomeComponent},
    {path: 'adduser', component: AdduserComponent},
    {path: 'contactlist', component: ContactlistComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'addproducts', component: AddproductsComponent},
    {path: 'calculator', component: CalculatorComponent},
   
 

    
];
