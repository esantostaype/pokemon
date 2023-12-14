import { Counter } from '../../components';
export default function CounterPage() {
    return (
        <section className="counter-page fadeIn">
            <h1 className="main-title">Counter Page</h1>
            <Counter value={ 20 } />
        </section>
    );
}