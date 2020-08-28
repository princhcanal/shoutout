import React from 'react';
import styles from './RegisterForm.module.scss';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import Input from '../Form/Input/Input';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import * as AuthActions from '../../store/auth/actions';
import { TokenPayload } from '../../store/auth';

interface RegisterFormValues {
	email: string;
	password: string;
	username: string;
}

const RegisterForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const initialValues = {
		email: '',
		password: '',
		username: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		password: Yup.string()
			.min(4, 'Password must be 4-15 characters')
			.max(15, 'Password must be 4-15 characters')
			.required('Required'),
		username: Yup.string().required('Required'),
	});

	const onSubmit = async (values: RegisterFormValues) => {
		try {
			const res = await axios.post('/auth/register', values);
			const expires = 1 / 24;
			Cookies.set('token', res.data.token.token, { expires });
			const token = Cookies.get('token');

			if (token) {
				const tokenPayload = jwtDecode<TokenPayload>(token);
				dispatch(AuthActions.setUserId(tokenPayload._id));
			}

			history.push('/feed');
			dispatch(AuthActions.setIsLoggedIn(true));
			console.log('Data:', res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.registerForm}>
			<Card className={styles.card}>
				<div className={styles.image}>
					<div className={styles.imageHeader}>
						<h1>Discover the World's Creativity</h1>
					</div>
					<div className={styles.imagePicture}>
						<svg
							id='f8e7fb86-f4c5-45a2-a9d6-6001fa0cc87b'
							data-name='Layer 1'
							xmlns='http://www.w3.org/2000/svg'
							width='1141'
							height='822.03666'
							viewBox='0 0 1141 822.03666'
						>
							<title>through_the_window</title>
							<rect
								x='769'
								y='657'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='869'
								y='658.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='808'
								y='658.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='826'
								y='731'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='864'
								y='713'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='925'
								y='713'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								y='263'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='38'
								y='245'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='99'
								y='245'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								y='409'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='100'
								y='410.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='39'
								y='410.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='768'
								y='48'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='806'
								y='30'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='867'
								y='30'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='1001'
								y='155'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='1039'
								y='137'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='1100'
								y='137'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='942'
								y='410'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='980'
								y='392'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='1041'
								y='392'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='92'
								y='28'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='130'
								y='10'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='191'
								y='10'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='488'
								y='80'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='526'
								y='62'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='587'
								y='62'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='556'
								y='18'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='594'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='655'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='852'
								y='80'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='952'
								y='81.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='891'
								y='81.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='931'
								y='270'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='1031'
								y='271.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='970'
								y='271.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='276'
								y='40'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='376'
								y='41.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='315'
								y='41.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<path
								d='M152.2515,140.3392V293.83189s234.07609-43.63844,380.86957,19.83983,349.13043,26.5312,349.13043,26.5312V140.3392Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2d848a'
							/>
							<path
								d='M539.73339,368.554C434.59752,326.89635,152.2515,344.31225,152.2515,344.31225V510.62906h730V394.936S644.86926,410.21157,539.73339,368.554Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2d848a'
							/>
							<rect
								x='797.96676'
								y='421.88581'
								width='1.32246'
								height='49.20301'
								fill='#3f3d56'
							/>
							<circle
								cx='798.62815'
								cy='421.88556'
								r='6.95802'
								fill='#3f3d56'
							/>
							<path
								d='M828.12815,491.19217s-.994-21.37891-21.37108-18.8939'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M191.53438,486.73889c4.01577,14.84469,17.77069,24.03839,17.77069,24.03839s7.24406-14.87431,3.2283-29.719-17.77069-24.03839-17.77069-24.03839S187.51862,471.8942,191.53438,486.73889Z'
								transform='translate(-29.5 -38.98167)'
								fill='#fff'
							/>
							<path
								d='M197.43527,483.54861c11.01933,10.72687,12.36526,27.21656,12.36526,27.21656s-16.51993-.902-27.53926-11.62886S169.896,471.91974,169.896,471.91974,186.416,472.82173,197.43527,483.54861Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M494.56726,460.49281c-8.38218,30.98558-37.093,50.17573-37.093,50.17573s-15.12066-31.0474-6.73848-62.033,37.09305-50.17572,37.09305-50.17572S502.94944,429.50724,494.56726,460.49281Z'
								transform='translate(-29.5 -38.98167)'
								fill='#fff'
							/>
							<path
								d='M418.31279,460.49281c8.38218,30.98558,37.093,50.17573,37.093,50.17573s15.12067-31.0474,6.73848-62.033-37.093-50.17572-37.093-50.17572S409.93061,429.50724,418.31279,460.49281Z'
								transform='translate(-29.5 -38.98167)'
								fill='#fff'
							/>
							<path
								d='M430.62981,453.83368c23.00083,22.39038,25.81021,56.8096,25.81021,56.8096s-34.48232-1.88275-57.48315-24.27313-25.81021-56.8096-25.81021-56.8096S407.629,431.4433,430.62981,453.83368Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M482.25024,453.83368c-23.00083,22.39038-25.81022,56.8096-25.81022,56.8096s34.48233-1.88275,57.48316-24.27313,25.81021-56.8096,25.81021-56.8096S505.25106,431.4433,482.25024,453.83368Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M575.55388,510.80856a7.93478,7.93478,0,1,1,7.93478-7.93478A7.94387,7.94387,0,0,1,575.55388,510.80856Zm0-14.5471a6.61232,6.61232,0,1,0,6.61232,6.61232A6.61969,6.61969,0,0,0,575.55388,496.26146Z'
								transform='translate(-29.5 -38.98167)'
								fill='#f0f0f0'
							/>
							<path
								d='M766.64989,387.81943a7.93478,7.93478,0,1,1,7.93479-7.93478A7.94387,7.94387,0,0,1,766.64989,387.81943Zm0-14.5471a6.61232,6.61232,0,1,0,6.61232,6.61232A6.61969,6.61969,0,0,0,766.64989,373.27233Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M226.9707,380.73755H213.91723V367.68407H226.9707Zm-12.04936-1.00411h11.04525V368.68819H214.92134Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M414.76056,325.8553H401.70708V312.80183h13.05348Zm-12.04936-1.00411h11.04525V313.80594H402.7112Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<circle
								cx='729.30619'
								cy='452.44282'
								r='6.6643'
								fill='#f0f0f0'
							/>
							<path
								d='M758.80619,510.67691a19.25242,19.25242,0,1,1,19.25241-19.25242A19.274,19.274,0,0,1,758.80619,510.67691Zm0-37.02388a17.77146,17.77146,0,1,0,17.77146,17.77146A17.79183,17.79183,0,0,0,758.80619,473.653Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<path
								d='M612.29914,311.70009c.63509.6169,1.29239,1.23413,1.95323,1.83442l-.60383.66473c-.6683-.60707-1.3326-1.23095-1.975-1.85479Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<path
								d='M721.13079,195.87722c.89355.81169,1.77629,1.65029,2.62414,2.49274l-.6331.637c-1.26934-1.26146-2.61085-2.50673-3.97-3.68566l.5889-.67829Q720.44042,195.2501,721.13079,195.87722Zm-5.64659-4.682-.5411.717c-1.43784-1.08574-2.92847-2.13294-4.43081-3.11377l.491-.75182C712.5223,189.0384,714.03,190.09751,715.4842,191.1952Zm12.02367,11.16325c1.20215,1.36868,2.37009,2.79395,3.47148,4.23637l-.7139.54461c-1.08879-1.42565-2.24353-2.83479-3.43253-4.188Zm-21.19111-17.1461-.43854.78407c-1.56938-.877-3.18974-1.71034-4.81588-2.47662l.38255-.81243C703.09009,183.48268,704.72921,184.32532,706.31676,185.21235Zm27.83466,25.848c1.001,1.51709,1.96212,3.0898,2.85674,4.67377l-.78155.44169c-.88508-1.56642-1.83541-3.121-2.825-4.62128Zm-37.73921-30.51532-.32549.837c-1.675-.65188-3.39318-1.25357-5.106-1.78815l.268-.85722C692.98081,179.2775,694.718,179.88573,696.41221,180.54506Zm43.12733,40.05605c.78443,1.6456,1.52064,3.33745,2.18791,5.02888l-.83566.32973c-.65967-1.67208-1.38752-3.34508-2.16314-4.972Zm-53.568-43.314-.20827.87359c-1.749-.41582-3.53419-.77682-5.30533-1.07175l.14744-.88619C682.39688,176.50133,684.20212,176.86633,685.97155,177.28707Zm57.59231,53.50864c.55087,1.73675,1.048,3.5124,1.47739,5.27858l-.87266.212c-.42466-1.74591-.91592-3.502-1.46059-5.21947ZM675.17719,175.488l-.08685.89384c-1.78986-.1739-3.60789-.28809-5.40428-.33937l.0252-.89771C671.52847,175.19655,673.36736,175.31191,675.17719,175.488Zm70.97658,65.95289c.308,1.79156.55829,3.61786.74393,5.42864l-.89335.09131c-.18372-1.79007-.43121-3.596-.73574-5.36788Zm-81.92-66.266.03562.89727c-1.797.07136-3.61463.20518-5.4027.39842l-.09626-.89311C660.57858,175.38229,662.4166,175.24687,664.23377,175.17485Zm83.0359,77.16037c.06168,1.81844.06122,3.66159-.0009,5.47774l-.89736-.0308c.06155-1.79595.06161-3.61813.00075-5.41627Zm-93.92421-75.98269.15667.884c-1.7689.31432-3.552.69451-5.2993,1.12978l-.21689-.87118C649.75281,177.05458,651.55623,176.67031,653.34546,176.35253Zm93.54954,86.9241c-.18586,1.80921-.43707,3.63429-.74584,5.42426l-.88519-.15245c.30539-1.76994.5537-3.57455.73787-5.364ZM642.71534,179.00288l.2763.85405c-1.713.55408-3.42778,1.17466-5.09765,1.84494l-.33428-.83327C639.24845,180.19059,640.98275,179.56286,642.71534,179.00288Zm102.31919,95.05739c-.43086,1.76557-.92872,3.53838-1.47952,5.269l-.85557-.27246c.54429-1.71109,1.03676-3.46394,1.46282-5.20956Zm-112.491-90.97534.39143.80817c-1.62091.78464-3.23522,1.63571-4.79811,2.52994l-.44593-.77948C629.27161,184.73885,630.90439,183.8779,632.54353,183.08493ZM741.71772,284.48188c-.66955,1.6915-1.40689,3.38067-2.191,5.02086l-.81018-.38763c.77535-1.62145,1.504-3.29127,2.16639-4.9638Zm-118.68467-95.9541.499.74713c-1.49577.999-2.97508,2.06278-4.39716,3.16134l-.54879-.7106C620.02436,190.61452,621.52048,189.5388,623.03305,188.52778ZM736.994,294.35949c-.89567,1.58207-1.85827,3.15369-2.86106,4.67075l-.74922-.49517c.99149-1.50006,1.94316-3.05377,2.82851-4.618ZM614.36967,195.22086l.59626.67138c-1.34213,1.1925-2.662,2.4485-3.92348,3.73289l-.6405-.62921C611.67721,197.69705,613.0122,196.427,614.36967,195.22086Zm116.5887,108.2726c-1.10244,1.44252-2.27026,2.868-3.47107,4.23687l-.67505-.59247c1.18773-1.35349,2.34235-2.76313,3.43236-4.1897ZM607.38,203.61649c-1.17237,1.36626-2.31148,2.78851-3.38554,4.22719l-.71957-.537c1.08615-1.45524,2.238-2.89346,3.42328-4.27524Zm-6.47489,8.67545c-.97531,1.51387-1.90939,3.07823-2.7759,4.65036l-.7863-.43347c.8762-1.59,1.82074-3.17238,2.80749-4.70341Zm-5.22434,9.48087c-.7562,1.62939-1.46544,3.30556-2.10747,4.98209l-.83865-.32108c.64948-1.69581,1.36666-3.39115,2.13175-5.03881Zm-3.86667,10.09925c-.52586,1.72014-.998,3.479-1.40377,5.22737l-.87488-.20293c.41038-1.76846.8881-3.54713,1.41984-5.28681ZM589.368,242.4122c-.28579,1.77738-.51331,3.58517-.67694,5.37221l-.8939-.08157c.165-1.80743.39509-3.63568.68394-5.43339Zm-.98528,10.7795c-.04146,1.79731-.02135,3.61945.05978,5.41616l-.897.04058c-.08211-1.81715-.10244-3.65992-.06087-5.47757Zm.489,10.81629c.204,1.78926.47171,3.59253.796,5.35956l-.88312.16221c-.32807-1.787-.59908-3.61078-.80513-5.42Zm1.9553,10.65247c.44622,1.74565.95754,3.49594,1.52013,5.20217l-.85287.28152c-.569-1.726-1.0862-3.49582-1.53726-5.26157Zm3.39418,10.28864c.68009,1.66753,1.42691,3.3314,2.21963,4.946l-.80611.39568c-.80166-1.63283-1.557-3.316-2.24531-5.00253Zm4.77578,9.72767c.9021,1.55552,1.87007,3.09919,2.87718,4.58867l-.74383.5032c-1.0188-1.50661-1.99786-3.06806-2.91011-4.6411Zm6.0642,8.968c1.1066,1.41518,2.27733,2.81128,3.48021,4.14981l-.6684.60016c-1.21633-1.35372-2.4004-2.76579-3.5194-4.19666Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<path
								d='M723.01119,311.18042l.6325.63736c-.64357.6387-1.30118,1.26969-1.9547,1.87565l-.61054-.65827C721.72439,312.43592,722.37472,311.812,723.01119,311.18042Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<path
								d='M673.58164,510.11974c-.17446-.28507-4.2879-7.15342-5.714-21.41573-1.308-13.08491-.46695-35.14055,10.9714-65.90636,21.66962-58.28377-4.99388-105.31032-5.26633-105.77875l1.31547-.76315c.069.11878,6.94927,12.1087,11.01372,31.20083a136.119,136.119,0,0,1-5.63752,75.87112c-21.6325,58.18429-5.54991,85.72823-5.38511,85.99994Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<circle
								cx='635.60829'
								cy='264.73258'
								r='9.88235'
								fill='#fff'
							/>
							<circle
								cx='666.77572'
								cy='301.22127'
								r='9.88235'
								fill='#3f3d56'
							/>
							<circle
								cx='645.49065'
								cy='325.54706'
								r='9.88235'
								fill='#3f3d56'
							/>
							<circle
								cx='671.3368'
								cy='346.07195'
								r='9.88235'
								fill='#3f3d56'
							/>
							<circle
								cx='637.88883'
								cy='377.99956'
								r='9.88235'
								fill='#fff'
							/>
							<path
								d='M679.55173,510.4835s-9.88235-24.3258,19.76471-42.57014Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M667.398,510.04224s-4.49755-25.86846-39.30782-25.64675Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M295.357,510.11974c-.17446-.28507-4.2879-7.15342-5.714-21.41573-1.308-13.08491-.46695-35.14055,10.9714-65.90636,21.66962-58.28377-4.99388-105.31032-5.26633-105.77875l1.31547-.76315c.069.11878,6.94927,12.1087,11.01372,31.20083a136.11886,136.11886,0,0,1-5.63752,75.87112c-21.63249,58.18429-5.54991,85.72823-5.38511,85.99994Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<circle
								cx='257.38365'
								cy='264.73258'
								r='9.88235'
								fill='#3f3d56'
							/>
							<circle
								cx='288.55108'
								cy='301.22127'
								r='9.88235'
								fill='#3f3d56'
							/>
							<circle
								cx='267.26601'
								cy='325.54706'
								r='9.88235'
								fill='#fff'
							/>
							<circle
								cx='293.11216'
								cy='346.07195'
								r='9.88235'
								fill='#fff'
							/>
							<circle
								cx='259.6642'
								cy='377.99956'
								r='9.88235'
								fill='#3f3d56'
							/>
							<path
								d='M301.32709,510.4835s-9.88235-24.3258,19.76471-42.57014Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M289.17333,510.04224s-4.49755-25.86846-39.30782-25.64675Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M491.74564,192.67448H384.94926l.42773-1.31006c.07471-.23,7.895-22.92285,42.50293-18.5415,3.26465-1.11524,35.12109-11.51612,54.1875.16894,8.46191,5.18555,12.75195,10.00537,12.75195,14.32617a6.35176,6.35176,0,0,1-2.83349,5.209Zm-103.90625-2H491.14554a4.29738,4.29738,0,0,0,1.67383-3.38574c-.01611-2.45606-2.07617-6.63428-11.79687-12.5918-18.8833-11.57227-52.37012-.02686-52.70606.09082l-.22412.0791-.23535-.03076C399.55765,171.16862,390.063,186.07731,387.83939,190.67448Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<path
								d='M847.22513,238.15446h-72.4375l.42774-1.31006c.05176-.15723,5.40234-15.65576,28.88965-12.71436,2.57422-.87158,23.85254-7.69482,36.68261.16895,5.79981,3.5542,8.74122,6.89307,8.74122,9.92285a4.62182,4.62182,0,0,1-2.06348,3.78516Zm-69.51171-2h68.89843a2.5538,2.5538,0,0,0,.917-1.96c-.01368-1.28516-1.043-4.05762-7.78614-8.19043-12.56933-7.70362-34.97754.0122-35.20215.09131l-.22363.07812-.23633-.03027C786.09721,223.8151,779.54545,232.70719,777.71342,236.15446Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<path
								d='M543.71928,264.41813h-72.4375l.42773-1.31006c.05176-.15771,5.395-15.65674,28.88965-12.71435,2.57471-.87159,23.85156-7.69483,36.6831.16894,5.8003,3.5542,8.74073,6.89258,8.74073,9.92285a4.62033,4.62033,0,0,1-2.06348,3.78516Zm-69.51124-2h68.89844a2.55778,2.55778,0,0,0,.91651-1.96c-.01319-1.28516-1.04248-4.05811-7.78565-8.19043-12.56982-7.70313-34.97754.01221-35.20263.09131l-.22413.07812-.23535-.03027C482.587,250.07682,476.0391,258.97086,474.208,262.41813Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<circle
								cx='191.189'
								cy='160.62754'
								r='29.42482'
								opacity='0.1'
							/>
							<path
								d='M225.64847,231.35661a38.69019,38.69019,0,1,1,38.68995-38.69043A38.73424,38.73424,0,0,1,225.64847,231.35661Zm0-75.38037a36.69019,36.69019,0,1,0,36.68995,36.68994A36.73184,36.73184,0,0,0,225.64847,155.97624Z'
								transform='translate(-29.5 -38.98167)'
								fill='#e6e6e6'
							/>
							<path
								d='M117.2515,110.57388v437h798v-437Zm760,399h-722v-361h722Z'
								transform='translate(-29.5 -38.98167)'
								fill='#3f3d56'
							/>
							<path
								d='M303.4415,509.57388l18.32,38h-171.86l3.35-399h271.9s-69.66,150.16-183.9,232Z'
								transform='translate(-29.5 -38.98167)'
								fill='#d0cde1'
								opacity='0.5'
							/>
							<path
								d='M727.0615,509.57388l-18.32,38h171.86l-3.35-399h-271.9s69.66,150.16,183.9,232Z'
								transform='translate(-29.5 -38.98167)'
								fill='#d0cde1'
								opacity='0.5'
							/>
							<rect
								x='112.7515'
								y='328.59221'
								width='112'
								height='19'
								fill='#3f3d56'
							/>
							<rect
								x='749.7515'
								y='328.59221'
								width='112'
								height='19'
								fill='#3f3d56'
							/>
							<path
								d='M1014.7515,389.57388l-4,94-25,94s-26,46-6,46,26-43,26-43l32-88,6-81Z'
								transform='translate(-29.5 -38.98167)'
								fill='#ffb8b8'
							/>
							<path
								d='M957.7515,740.57388l2,72h20l8-46s7-19,7-20S957.7515,740.57388,957.7515,740.57388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#ffb8b8'
							/>
							<path
								d='M982.7515,808.57388h-25s-10,15-12,15-31,1-13,14,35,7,35,7v12s20,10,21,0q.015-.15.0294-.30058a71.38071,71.38071,0,0,0-4.38554-31.77536C982.01632,818.13975,980.052,810.73346,982.7515,808.57388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<path
								d='M1022.24613,735.114l23.0021,68.25616,19.12278-5.85828-5.825-46.3257s1.1276-20.217.83469-21.17317S1022.24613,735.114,1022.24613,735.114Z'
								transform='translate(-29.5 -38.98167)'
								fill='#ffb8b8'
							/>
							<path
								d='M1066.06777,792.8086l-23.90347,7.32286s-5.16768,17.27122-7.07995,17.85705-29.34739,10.03648-8.329,17.19382,35.51526-3.559,35.51526-3.559l3.515,11.47366s22.05191,3.70311,20.07891-6.1512q-.02959-.14781-.05993-.296a71.3806,71.3806,0,0,0-13.50065-29.09706C1068.16681,802.17024,1064.11927,795.66416,1066.06777,792.8086Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<circle
								cx='949.7515'
								cy='297.09221'
								r='29'
								fill='#ffb8b8'
							/>
							<path
								d='M973.7515,356.57388s18,25,14,31,43-5,43-5-29-33-28-39S973.7515,356.57388,973.7515,356.57388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#ffb8b8'
							/>
							<path
								d='M1011.7515,373.57388s-24,0-32,10-17,31-17,31-8.50694,3.19011-11.56413,20.03785a57.84437,57.84437,0,0,0,5.16771,35.58066c5.04268,10.35928,10.94456,25.09539,5.89642,28.88149-8,6-31,55-31,137,0,45.69672-13.1987,77.26306-24.88544,96.25664-9.77944,15.8938,3.95675,35.83019,22.309,32.44725q.53354-.09834,1.07641-.20389c36-7,141-20,141-20l-29-71s-14-23-5-59-16-102-16-102,33.5-75.5,27.5-92.5-13.5-51.5-20.5-50.5A112.02862,112.02862,0,0,0,1011.7515,373.57388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<path
								d='M979.7515,389.57388l-4,94-25,94s-26,46-6,46,26-43,26-43l32-88,6-81Z'
								transform='translate(-29.5 -38.98167)'
								fill='#ffb8b8'
							/>
							<path
								d='M997.7515,379.57388s-22,0-25,10-3.5909,11.45394-3.5909,11.45394,8.5909-11.45394,19.5909,5.54606,25,21,25,21S1016.7515,387.57388,997.7515,379.57388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<circle
								cx='969.7515'
								cy='280.09221'
								r='40'
								fill='#2f2e41'
							/>
							<path
								d='M992.9533,351.67441a39.99629,39.99629,0,0,1-27.82323-47.17282c-.28069.78026-.5467,1.56925-.78193,2.37612a40,40,0,1,0,76.80258,22.39114c.23523-.80686.43491-1.61519.61751-2.424A39.99634,39.99634,0,0,1,992.9533,351.67441Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<ellipse
								cx='939.7515'
								cy='302.09221'
								rx='3'
								ry='5'
								fill='#ffb8b8'
							/>
							<circle
								cx='984.7515'
								cy='240.09221'
								r='14'
								fill='#2f2e41'
							/>
							<path
								d='M997.2515,276.07388a13.9997,13.9997,0,0,1,12.5-13.91723,14,14,0,1,0,0,27.83447A13.9997,13.9997,0,0,1,997.2515,276.07388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<path
								d='M966.2515,303.07388a18,18,0,0,0-18,18h36A18,18,0,0,0,966.2515,303.07388Z'
								transform='translate(-29.5 -38.98167)'
								fill='#2f2e41'
							/>
							<rect
								x='610'
								y='620'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='648'
								y='602'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='709'
								y='602'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='508'
								y='573'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='546'
								y='555'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='607'
								y='555'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='175'
								y='686'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='213'
								y='668'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='274'
								y='668'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='346'
								y='639'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='446'
								y='640.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='385'
								y='640.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='127'
								y='586'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='227'
								y='587.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='166'
								y='587.5'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='403'
								y='713'
								width='140'
								height='2'
								fill='#f2f2f2'
							/>
							<rect
								x='441'
								y='695'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
							<rect
								x='502'
								y='695'
								width='2'
								height='18.5'
								fill='#f2f2f2'
							/>
						</svg>
						{/* <img
							src='https://assets.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg'
							alt=''
						/> */}
					</div>
				</div>
				<div className={styles.form}>
					<div className={styles.formHeader}>
						<h1>Register</h1>
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						<Form>
							<Input
								type='text'
								name='username'
								id='username'
								label='Username'
								placeholder='Username'
								className={styles.input}
							/>
							<Input
								type='email'
								name='email'
								id='email'
								label='Email'
								placeholder='Email'
								className={styles.input}
							/>
							<Input
								type='password'
								name='password'
								id='password'
								label='Password'
								placeholder='Password'
								className={styles.input}
							/>
							<p className={styles.login}>
								Already have an account?{' '}
								<Link to='/login'>Login</Link>
							</p>
							<div className={styles.buttons}>
								<button type='submit' className={styles.button}>
									Register
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</Card>
		</div>
	);
};

export default RegisterForm;
