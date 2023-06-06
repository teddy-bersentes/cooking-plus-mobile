import React, { useState } from 'react';
import { Button, IconArrowLeft, IconArrowRight, OrderCard, Screen, Text, View } from '~/components';
import { MainStackScreenProps } from '.';
import { useAuthStore } from '~/lib/store/auth';
import { FlatListWithHeaders, Header, LargeHeader, ScalingView, ScrollViewWithHeaders } from '@codeherence/react-native-header';
import { useQuery } from '@tanstack/react-query';
import { MealType, apiClient, defrag, orderModel, ordersDoc } from '~/lib/graphql';
import dayjs from 'dayjs';

type Props = MainStackScreenProps<'Orders'>

export function OrderListScreen({ navigation }: Props) {
	const [date, setDate] = useState(dayjs())
	const ordersQuery = useQuery({
		queryKey: ['orders', date.format('YYYY-MM-DD')],
		queryFn: () => apiClient.request(ordersDoc, {
			beforeDate: date.endOf('day').toISOString(),
			afterDate: date.startOf('day').toISOString()
		}),
		select: data => {
			const order = data.orders.map(order => defrag(orderModel, order))
			return {
				[MealType.Breakfast]: order.filter(order => order.mealType === MealType.Breakfast),
				[MealType.Lunch]: order.filter(order => order.mealType === MealType.Lunch),
				[MealType.Dinner]: order.filter(order => order.mealType === MealType.Dinner),
			}
		}
	})

	const onBackPress = () => {
		setDate(date => date.subtract(1, 'day'))
	}

	const onForwardPress = () => {
		setDate(date => date.add(1, 'day'))
	}


	return (
		<ScrollViewWithHeaders
			style={{ paddingHorizontal: 20 }}
			containerStyle={{ backgroundColor: 'white' }}
			LargeHeaderComponent={({ scrollY }) => (
				<LargeHeader headerStyle={{ paddingHorizontal: 0, marginBottom: 24 }}>
					<ScalingView scrollY={scrollY}>
						<Text tw='text-[34px] font-pro-display-bold leading-[41px] tracking-[0.37px]'>
							Orders
						</Text>
					</ScalingView>
				</LargeHeader>
			)}
			HeaderComponent={({ showNavBar }) => (
				<Header
					showNavBar={showNavBar}
					headerCenter={
						<Text tw='font-pro-text-semibold text-[17px] leading-[22px] tracking-[-0.41px]'>
							Orders
						</Text>
					}
				/>
			)}
		>

			<View tw='w-full flex flex-row items-center justify-between pb-4'>
				<Button onPress={onBackPress}>
					<IconArrowLeft width={16} height={16} />
				</Button>

				<Text tw='font-pro-display-semibold text-base'>{date.format('dddd, MMMM D')}</Text>

				<Button onPress={onForwardPress}>
					<IconArrowRight width={16} height={16} />
				</Button>
			</View>

			{ordersQuery.isSuccess && (
				<View tw='w-full flex flex-col'>
					<Text variant='group-title'>BREAKFAST</Text>
					{ordersQuery.data[MealType.Breakfast].map(order => (
						<OrderCard key={order.id} order={order} />
					))}
					<View tw='h-8' />

					<Text variant='group-title'>LUNCH</Text>
					{ordersQuery.data[MealType.Lunch].map(order => (
						<OrderCard key={order.id} order={order} />
					))}
					<View tw='h-8' />

					<Text variant='group-title'>DINNER</Text>
					{ordersQuery.data[MealType.Dinner].map(order => (
						<OrderCard key={order.id} order={order} />
					))}
					<View tw='h-8' />
				</View>
			)}
		</ScrollViewWithHeaders>
	);
}
